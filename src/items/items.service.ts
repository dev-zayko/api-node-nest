import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items, ItemsDocument } from './schema/items.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name) private itemsModel: Model<ItemsDocument>,
  ) {}
  async create(createItemDto: CreateItemDto) {
    //TODO DTO createItemDto --> BODY esto trae la data
    return this.itemsModel.create(createItemDto);
  }

  async findAll() {
    return this.itemsModel.find();
  }

  findOne(id: number) {
    return this.itemsModel.findById(id);
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemsModel.updateOne({
      _id: id,
      $set: updateItemDto,
    });
  }

  remove(id: number) {
    return this.itemsModel.remove(id);
  }
}
