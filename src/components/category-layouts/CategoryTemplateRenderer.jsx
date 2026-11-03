import React from 'react';
import { GroceryLayout } from './GroceryLayout';
import { HotelServicesLayout } from './HotelServicesLayout';
import { ElectronicsLayout } from './ElectronicsLayout';
import { PackagedFoodLayout } from './PackagedFoodLayout';
import { FashionGridLayout } from './FashionGridLayout';

export const CategoryTemplateRenderer = ({ category, products, shop }) => {
  const layout = category?.layoutTemplate || 'grocery';

  switch (layout) {
    case 'grocery':
      return <GroceryLayout products={products} shop={shop} categoryName={category.name} />;
    case 'hotel':
      return <HotelServicesLayout products={products} shop={shop} categoryName={category.name} />;
    case 'electronics':
      return <ElectronicsLayout products={products} shop={shop} categoryName={category.name} />;
    case 'packaged-food':
      return <PackagedFoodLayout products={products} shop={shop} categoryName={category.name} />;
    case 'fashion-grid':
      return <FashionGridLayout products={products} shop={shop} categoryName={category.name} />;
    default:
      return <GroceryLayout products={products} shop={shop} categoryName={category.name} />;
  }
};

