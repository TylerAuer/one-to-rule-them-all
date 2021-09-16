import argon2d from 'argon2';
import { Arg, Field, FieldResolver, InputType, Mutation, Resolver, Root } from 'type-graphql';
import { Task } from '../entities/Task';
import { User } from '../entities/User';

@InputType()
class RegisterUserInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
class LoginUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Task])
  async created_tasks(@Root() user: User): Promise<Task[]> {
    return await Task.find({ where: { creator: user.id } });
  }

  @FieldResolver(() => [Task])
  async assigned_tasks(@Root() user: User): Promise<Task[]> {
    return await Task.find({ where: { assignee: user.id } });
  }

  @Mutation(() => User)
  async registerUser(@Arg('input') input: RegisterUserInput): Promise<User> {
    const { name, email, password } = input;
    const lowerCaseEmail = email.toLowerCase();
    const hashedPassword = await argon2d.hash(password);

    try {
      return await User.create({ name, email: lowerCaseEmail, password: hashedPassword }).save();
    } catch {
      throw new Error('Email already in use.');
    }
  }

  @Mutation(() => User)
  async login(@Arg('input') input: LoginUserInput): Promise<User> {
    const { email, password } = input;
    const lowerCaseEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email: lowerCaseEmail } });
    if (!user) {
      throw new Error('Email not found.');
    }
    const isCorrectPassword = await argon2d.verify(user.password, password);
    if (!isCorrectPassword) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}
