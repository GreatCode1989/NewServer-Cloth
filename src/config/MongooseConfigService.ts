import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory } from '@nestjs/mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `${process.env.SERVER_URL}`,
      dbName: `${process.env.DATABASE_NAME}`,
    };
  }
}
