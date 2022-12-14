import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { initialData } from './data';
import { User } from '../users/entities';
import { Category } from '../categories/entities';
import { Subcategory } from '../subcategories/entities';
import { ErrorHandlerService } from '../common/services/error-handler';
import { Role } from '../roles/entities/role.entity';
import { Product } from '../products/entities/product.entity';
import { SubcategoriesService } from '../subcategories/subcategories.service';
import { Tag } from '../tags/entities';
import { TagsService } from '../tags/tags.service';
import { VariantColor } from '../variants/variant-colors/entities';
import { VariantSize } from '../variants/variant-sizes/entities';
import { Image } from '../images/entities';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(VariantColor)
    private readonly variantColorRepository: Repository<VariantColor>,
    @InjectRepository(VariantSize)
    private readonly variantSizeRepository: Repository<VariantSize>,
    @InjectRepository(Image)
    private readonly imgsRepository: Repository<Image>,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly subcategoryService: SubcategoriesService,
    private readonly tagService: TagsService,
  ) {}

  async runSeed(): Promise<string> {
    if (process.env.NODE_ENV === 'development') {
      await this.deleteTables();
      await this.insertTables();
      return 'Seed completed';
    }

    return "Can't run this task in production environment";
  }

  private async deleteTables(): Promise<void> {
    await this.deleteProducts();
    await this.deleteSizes();
    await this.deleteColors();
    await this.deleteTags();
    await this.deleteSubcategories();
    await this.deleteCategories();
    await this.deleteImgs();
    await this.deleteUsers();
    await this.deleteRoles();
  }

  private async insertTables(): Promise<void> {
    await this.insertRoles();
    await this.insertUsers();
    await this.insertImgs();
    await this.insertCategories();
    await this.insertSubategories();
    await this.insertTags();
    await this.insertColors();
    await this.insertSizes();
    await this.insertProducts();
  }

  private async insertRoles(): Promise<Role> {
    const seedRoles = initialData.roles;

    const roles: Role[] = [];

    try {
      seedRoles.forEach((role) => {
        roles.push(this.rolesRepository.create(role));
      });

      await this.rolesRepository.save(seedRoles);

      return roles[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteRoles(): Promise<void> {
    try {
      const queryBuilder = this.rolesRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertUsers(): Promise<User> {
    const seedUsers = initialData.users;

    const users: User[] = [];

    try {
      seedUsers.forEach((user) => {
        users.push(this.usersRepository.create(user));
      });

      await this.usersRepository.save(seedUsers);

      return users[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteUsers(): Promise<void> {
    try {
      const queryBuilder = this.usersRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertCategories(): Promise<Category> {
    const seedCategories = initialData.categories;

    const categories: Category[] = [];

    try {
      seedCategories.forEach((category) => {
        categories.push(this.categoryRepository.create(category));
      });

      await this.categoryRepository.save(seedCategories);

      return categories[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteCategories(): Promise<void> {
    try {
      const queryBuilder = this.categoryRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertSubategories(): Promise<Subcategory> {
    const seedSubcategories = initialData.subcategories;

    const subcategories: Subcategory[] = [];

    try {
      seedSubcategories.forEach((subcategory) => {
        subcategories.push(this.subcategoryRepository.create(subcategory));
      });

      await this.subcategoryRepository.save(seedSubcategories);

      return subcategories[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteSubcategories(): Promise<void> {
    try {
      const queryBuilder = this.subcategoryRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertTags(): Promise<Tag> {
    const seedTags = initialData.tags;

    const tags: Tag[] = [];

    try {
      seedTags.forEach((tag) => {
        tags.push(this.tagRepository.create(tag));
      });

      await this.tagRepository.save(seedTags);

      return tags[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteTags(): Promise<void> {
    try {
      const queryBuilder = this.tagRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertColors(): Promise<VariantColor> {
    const seedColors = initialData.variants.colors;

    const colors: VariantColor[] = [];

    try {
      seedColors.forEach((color) => {
        colors.push(this.variantColorRepository.create(color));
      });

      await this.variantColorRepository.save(seedColors);

      return colors[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteColors(): Promise<void> {
    try {
      const queryBuilder = this.variantColorRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertSizes(): Promise<VariantSize> {
    const seedSizes = initialData.variants.sizes;

    const sizes: VariantSize[] = [];

    try {
      seedSizes.forEach((size) => {
        sizes.push(this.variantSizeRepository.create(size));
      });

      await this.variantSizeRepository.save(seedSizes);

      return sizes[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteSizes(): Promise<void> {
    try {
      const queryBuilder = this.variantSizeRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertProducts(): Promise<Product> {
    const seedProducts = initialData.products;

    const products: Product[] = [];

    try {
      seedProducts.forEach(async (product, i) => {
        const subs = await this.subcategoryService.findByIds(
          seedProducts[i].subcategory,
        );

        const tags = await this.tagService.findByIds(seedProducts[i].tag);

        const insertProduct = this.productsRepository.create({
          ...product,
          subcategory: subs,
          tag: tags,
        });

        await this.productsRepository.save(insertProduct);

        products.push(insertProduct);
      });

      return products[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteProducts(): Promise<void> {
    try {
      const queryBuilder = this.productsRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertImgs(): Promise<Image> {
    const seedImgs = initialData.images;

    const images: Image[] = [];

    try {
      seedImgs.forEach((img) => {
        images.push(this.imgsRepository.create(img));
      });

      await this.imgsRepository.save(seedImgs);

      return images[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteImgs(): Promise<void> {
    try {
      const queryBuilder = this.imgsRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
