/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//TODO El schema de los items (collection)
export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({required: true})
  name: string;

  @Prop({unique: true, required: true})
  email: string;

  @Prop({required: true})
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(Users);
