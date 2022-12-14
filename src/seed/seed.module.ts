import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { CommonModule } from '../common/common.module';
import { ImagesModule } from '../images/images.module';
import { ProductsModule } from '../products/products.module';
import { RolesModule } from '../roles/roles.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { SubcategoriesModule } from '../subcategories/subcategories.module';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';
import { VariantsModule } from 'src/variants/variants.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    CategoriesModule,
    CommonModule,
    ImagesModule,
    ProductsModule,
    RolesModule,
    RolesModule,
    SubcategoriesModule,
    TagsModule,
    UsersModule,
    VariantsModule,
  ],
})
export class SeedModule {}
