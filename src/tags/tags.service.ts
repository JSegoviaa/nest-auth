import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto, UpdateTagDto } from './dto';
import { Tag } from './entities';
import { ErrorHandlerService } from '../common/services/error-handler';
import { QueryDto } from '../common/dtos';
import { Tags } from './interface';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      const newTag = this.tagsRepository.create({
        ...createTagDto,
        name: createTagDto.name.toLowerCase(),
      });

      return await this.tagsRepository.save(newTag);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<Tags> {
    const { limit = 10, offset = 0, sort = 'ASC', order = 'id' } = queryDto;

    try {
      const [tags, total] = await Promise.all([
        this.tagsRepository.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.tagsRepository.count(),
      ]);

      return { total, tags };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<Tag> {
    try {
      const tag = await this.tagsRepository.findOneBy({ id });

      if (!tag) {
        throw new NotFoundException(`Tag with id ${id} doest not exist`);
      }
      return tag;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOneByName(name: string): Promise<Tag> {
    try {
      const tag = await this.tagsRepository.findOneBy({ name });

      if (!tag) {
        throw new NotFoundException(`Tag with name ${name} doest not exist`);
      }
      return tag;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    try {
      await this.findOne(id);

      const tag = await this.tagsRepository.preload({
        id,
        ...updateTagDto,
        name: updateTagDto.name.toLowerCase(),
      });

      return await this.tagsRepository.save(tag);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<Tag> {
    try {
      const tag = await this.findOne(id);

      await this.tagsRepository.remove(tag);

      return { ...tag, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findByIds(id: Tag[]): Promise<Tag[]> {
    try {
      const tags = await this.tagsRepository.findBy({
        id: In(id),
      });

      if (tags.length === 0) {
        throw new NotFoundException('Tags not found');
      }

      return tags;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
