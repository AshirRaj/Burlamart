import React, { useState, useMemo } from 'react';
import { 
  GroceryHeroBanner, 
  GrocerySubcategoryGrid, 
  GrocerySectionRow, 
  GROCERY_CATALOG_SECTIONS 
} from '../grocery';

export const GroceryLayout = ({ products = [], shop, categoryName }) => {
  const [selectedSubcat, setSelectedSubcat] = useState(null);

  // Combine static rich catalogue with any dynamic products added to shop
  const combinedSections = useMemo(() => {
    // Clone sections
    const sections = GROCERY_CATALOG_SECTIONS.map((sec) => ({
      ...sec,
      items: [...sec.items]
    }));

    // If products were passed in from backend/mock, categorize them into sections or add to first section
    if (products && products.length > 0) {
      products.forEach((prod) => {
        // avoid duplicates
        const alreadyExists = sections.some((s) => s.items.some((i) => i.id === prod.id));
        if (!alreadyExists) {
          // match by tag or default to fruits/vegetables or dairy
          const matchedSection = sections.find((s) => 
            (prod.tags && prod.tags.some((t) => s.title.toLowerCase().includes(t.toLowerCase()))) ||
            s.title.toLowerCase().includes(prod.category || '')
          );
          if (matchedSection) {
            matchedSection.items.unshift(prod);
          } else {
            sections[0].items.unshift(prod);
          }
        }
      });
    }

    return sections;
  }, [products]);

  const handleSelectSubcategory = (subcatId) => {
    setSelectedSubcat(subcatId);
    // Smooth scroll to section if exists
    const element = document.getElementById(`section-${subcatId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToCatalogue = () => {
    const firstSection = document.getElementById('section-dairy-bread-eggs');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-8">
      {/* 1. Blinkit-Style Top Hero Banner & 3 Promo Cards */}
      <GroceryHeroBanner onShopNow={handleScrollToCatalogue} />

      {/* 2. Sub-Category Visual Icon Grid (20 categories) */}
      <GrocerySubcategoryGrid
        selectedSubcat={selectedSubcat}
        onSelectSubcategory={handleSelectSubcategory}
      />

      {/* 3. Categorized Product Carousels */}
      <div className="space-y-8">
        {combinedSections.map((section) => (
          <GrocerySectionRow
            key={section.id}
            section={section}
            shop={shop}
            onSeeAll={handleSelectSubcategory}
          />
        ))}
      </div>
    </div>
  );
};
