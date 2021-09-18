import argon2d from 'argon2';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Task } from '../entities/Task';
import { User } from '../entities/User';
import { CustomContextType } from '../types';

@InputType()
class RegisterUserInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  phone_number: string;
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

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: CustomContextType): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    return await User.findOne(req.session.userId);
  }

  @Mutation(() => User)
  async registerUser(
    @Arg('input') input: RegisterUserInput,
    @Ctx() { req }: CustomContextType
  ): Promise<User> {
    const { name, email, password } = input;
    const lowerCaseEmail = email.toLowerCase();
    const hashedPassword = await argon2d.hash(password);

    try {
      const user = await User.create({
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
      }).save();
      req.session.userId = user.id; // Login the user
      return user;
    } catch {
      throw new Error('Email already in use.');
    }
  }

  @Mutation(() => User)
  async login(
    @Arg('input') input: LoginUserInput,
    @Ctx() { req }: CustomContextType
  ): Promise<User> {
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

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => String)
  logout(@Root() user: User, @Ctx() { req }: CustomContextType): User {
    req.session.userId = undefined;
    return user;
  }
}
