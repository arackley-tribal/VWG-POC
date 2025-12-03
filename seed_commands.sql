
-- Insert data into knowledge_hub_items
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Dashboards Explained – Onboarding', 'Learn how to navigate the Showroom Companion App, from your first login to managing customer sessions. Discover how to move between the Retailer and Customer Dashboards, start or continue consultations, and use Sales Advisor Mode. You’ll also learn how to set up the app on your tablet or desktop for the best in-showroom experience.', 'https://showroom-assets.volkswagen.co.uk/images/01-pwa-Dashboard_expained_onboarding-v2.jpg', '---
assets:
  - id: 319
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/01-pwa-Dashboard_expained_onboarding-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/01-pwa-Dashboard_expained_onboarding-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/CuDlfhMeSoU
    title: ''Dashboards Explained – Onboarding ''
---

Dashboards Explained – Onboarding
=================================

Learn how to navigate the Showroom Companion App, from your first login to managing customer sessions. Discover how to move between the Retailer and Customer Dashboards, start or continue consultations, and use Sales Advisor Mode. You’ll also learn how to set up the app on your tablet or desktop for the best in-showroom experience.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'companion,https,youtu,cudlfhmesou,imagefilename,driver,login,assets,sessions,retailer'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Dashboards Explained – Onboarding'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Dashboards Explained – New/Existing Customers & Sales Advisor Mode', 'Learn how to manage both new and returning customers within the app. Explore how to start a new consultation, continue an existing one, or use Sales Advisor Mode to practise and explore independently. You’ll also see how to find quick tips, access helpful guides, and share feedback directly from your dashboard.', 'https://showroom-assets.volkswagen.co.uk/images/02-pwa-new_customer-v2.jpgg', '---
assets:
  - id: 321
    assetType: DRIVER_BENEFITS
    imageFileName: https://showroom-assets.volkswagen.co.uk/images/02-pwa-new_customer-v2.jpg
    thumbnailImageFileName: https://showroom-assets.volkswagen.co.uk/images/02-pwa-new_customer-v2.jpg
    assetFileName: ''''
    url: https://www.youtube.com/watch?v=E9lT6LZbOmY
    title: ''Dashboards Explained – New/Existing Customers & Sales Advisor Mode ''
---

Dashboards Explained – New/Existing Customers & Sales Advisor Mode
==================================================================

Learn how to manage both new and returning customers within the app. Explore how to start a new consultation, continue an existing one, or use Sales Advisor Mode to practise and explore independently. You’ll also see how to find quick tips, access helpful guides, and share feedback directly from your dashboard.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'lzbomy,watch,https,imagefilename,youtube,title,showroom,returning,www,driver'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Dashboards Explained – New/Existing Customers & Sales Advisor Mode'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Customer Dashboard Deep Dive', 'Learn how to make the most of the Customer Dashboard - your central space for every consultation. Explore how to navigate between key tools like Configure Models, Saved Models, and Stock Search, and how to use quick-jump tiles to access recommendations, saved configurations, and model details with ease.', 'https://showroom-assets.volkswagen.co.uk/images/03-pwa-customer_dash_deepdive-v2.jpg', '---
assets:
  - id: 323
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/03-pwa-customer_dash_deepdive-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/03-pwa-customer_dash_deepdive-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/ZRFyDFF6Z3w
    title: ''Customer Dashboard Deep Dive ''
---

Customer Dashboard Deep Dive
============================

Learn how to make the most of the Customer Dashboard - your central space for every consultation. Explore how to navigate between key tools like Configure Models, Saved Models, and Stock Search, and how to use quick-jump tiles to access recommendations, saved configurations, and model details with ease.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'https,imagefilename,youtu,zrfydff,showroom,driver,assettype,assets,pwa,deepdive'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Customer Dashboard Deep Dive'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Editing Customer Settings', 'Learn how to view and update customer profiles, add notes, and share customers with colleagues. Explore how to review session history, manage saved configurations, and use the internal handover checklist to keep the process consistent and professional from start to finish.', 'https://showroom-assets.volkswagen.co.uk/images/04-pwa-Editing_customer-v2.jpg', '---
assets:
  - id: 325
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/04-pwa-Editing_customer-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/04-pwa-Editing_customer-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/ESaWa50mgWU
    title: ''Editing Customer Settings ''
---

Editing Customer Settings
=========================

Learn how to view and update customer profiles, add notes, and share customers with colleagues. Explore how to review session history, manage saved configurations, and use the internal handover checklist to keep the process consistent and professional from start to finish.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'settings,title,https,imagefilename,showroom,youtu,esawa,driver,assettype,assets'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Editing Customer Settings'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Bespoke Retailer Options', 'Learn how to create and manage bespoke retailer options that reflect the unique services or products your dealership offers. Discover how to set pricing, share options with colleagues, and apply them to specific models, so your customers see everything your dealership can provide directly in the configurator.', 'https://showroom-assets.volkswagen.co.uk/images/06-pwa-Bespoke_retailer_options-v2.jpg', '---
assets:
  - id: 329
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/06-pwa-Bespoke_retailer_options-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/06-pwa-Bespoke_retailer_options-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/UyIW0Hd-1Bo
    title: ''Bespoke Retailer Options ''
---

Bespoke Retailer Options
========================

Learn how to create and manage bespoke retailer options that reflect the unique services or products your dealership offers. Discover how to set pricing, share options with colleagues, and apply them to specific models, so your customers see everything your dealership can provide directly in the configurator.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'https,imagefilename,showroom,youtu,uyiw,driver,assettype,pwa,share,colleagues'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Bespoke Retailer Options'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Configurator Deep Dive & Send a Brochure', 'Learn how to guide customers through the configuration journey, from selecting models, trims, and engines to customising colours, wheels, and options. See how to send a personalised brochure that includes selected features, finance details, and favourited items for a tailored follow-up.', 'https://showroom-assets.volkswagen.co.uk/images/07-pwa-configurator_deep_dive-v2.jpg', '---
assets:
  - id: 331
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/07-pwa-configurator_deep_dive-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/07-pwa-configurator_deep_dive-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/JqCdKWLG4ks
    title: ''Configurator Deep Dive & Send a Brochure ''
---

Configurator Deep Dive & Send a Brochure
========================================

Learn how to guide customers through the configuration journey, from selecting models, trims, and engines to customising colours, wheels, and options. See how to send a personalised brochure that includes selected features, finance details, and favourited items for a tailored follow-up.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'https,imagefilename,showroom,configuration,youtu,jqcdkwlg,driver,assettype,assets,pwa'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Configurator Deep Dive & Send a Brochure'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Loading a Preconfigured Model or Stock Model', 'Learn how to quickly load a saved configuration or specific stock model using a configuration code, order number, or VIN. Explore how to continue editing, add comparisons, or send brochures directly from the configuration summary page.', 'https://showroom-assets.volkswagen.co.uk/images/08-pwa-Loading_preconfigured_model-v2.jpg', '---
assets:
  - id: 333
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/08-pwa-Loading_preconfigured_model-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/08-pwa-Loading_preconfigured_model-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/TR-qzAQ8y8U
    title: ''Loading a Preconfigured Model or Stock Model ''
---

Loading a Preconfigured Model or Stock Model
============================================

Learn how to quickly load a saved configuration or specific stock model using a configuration code, order number, or VIN. Explore how to continue editing, add comparisons, or send brochures directly from the configuration summary page.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'https,imagefilename,showroom,configuration,youtu,qzaq,driver,assettype,pwa,order'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Loading a Preconfigured Model or Stock Model'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Creating an Insert', 'Learn how to create professional showroom inserts that showcase key vehicle features and pricing. Explore how to select formats, preview your design, and share or download the final PDF for display or internal use.', 'https://showroom-assets.volkswagen.co.uk/images/09-pwa-Creating_and_insert-v2.jpg', '---
assets:
  - id: 335
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/09-pwa-Creating_and_insert-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/09-pwa-Creating_and_insert-v2.jpg
    assetFileName: ''''
    url: https://youtu.be/l72P1bmH75Y
    title: ''Creating an Insert ''
---

Creating an Insert
==================

Learn how to create professional showroom inserts that showcase key vehicle features and pricing. Explore how to select formats, preview your design, and share or download the final PDF for display or internal use.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'creating,showroom,https,imagefilename,bmh,youtu,driver,assettype,assets,inserts'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Creating an Insert'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Stock Search Overview', 'Learn how to use the Stock Search Tool to find vehicles available at your retailer, across your group, or nationally. Discover how to filter results, view key specifications, favourite vehicles, and send brochures - helping you match customers to available cars quickly and efficiently.', 'https://showroom-assets.volkswagen.co.uk/images/10-pwa-stock_search_and_overview-v2.jpg', '---
assets:
  - id: 337
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/10-pwa-stock_search_and_overview-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/images/10-pwa-stock_search_and_overview-v2.jpg
    assetFileName: ''''
    url: https://www.youtube.com/watch?v=Ur67R9I8Cpw
    title: ''Stock Search Overview ''
---

Stock Search Overview
=====================

Learn how to use the Stock Search Tool to find vehicles available at your retailer, across your group, or nationally. Discover how to filter results, view key specifications, favourite vehicles, and send brochures - helping you match customers to available cars quickly and efficiently.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'tool,cpw,watch,https,imagefilename,title,showroom,youtube,www,driver'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Stock Search Overview'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
INSERT INTO "public"."knowledge_hub_items" (name, short_description, primary_image, content, category, popularity, featured, tags)
SELECT 'Create and Edit a Comparison', 'Learn how to build and manage vehicle comparisons to help customers weigh up their options. Discover how to create new comparisons, adjust the order of vehicles, and include them in brochures, making it easy to present tailored choices side by side.', 'https://showroom-assets.volkswagen.co.uk/11-pwa-Create_and_edit_comparison-v2.jpg', '---
assets:
  - id: 339
    assetType: DRIVER_BENEFITS
    imageFileName: >-
      https://showroom-assets.volkswagen.co.uk/11-pwa-Create_and_edit_comparison-v2.jpg
    thumbnailImageFileName: >-
      https://showroom-assets.volkswagen.co.uk/11-pwa-Create_and_edit_comparison-v2.jpg
    assetFileName: ''''
    url: https://www.youtube.com/watch?v=fDmsKzig5qo
    title: ''Create and Edit a Comparison ''
---

Create and Edit a Comparison
============================

Learn how to build and manage vehicle comparisons to help customers weigh up their options. Discover how to create new comparisons, adjust the order of vehicles, and include them in brochures, making it easy to present tailored choices side by side.',
  (SELECT id FROM knowledge_hub_categories WHERE id = 17 LIMIT 1), 0, false, 'comparisons,fdmskzig,watch,imagefilename,https,title,showroom,youtube,www,assets'
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Create and Edit a Comparison'));

-- Insert mappings for knowledge_hub_item_fuel_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_injection_types_mapping
-- Insert mappings for knowledge_hub_item_fuel_efficiency_levels_mapping
-- Insert mappings for knowledge_hub_item_emissions_control_types_mapping
-- Insert mappings for knowledge_hub_item_gearbox_types_mapping
-- Insert mappings for knowledge_hub_item_body_styles_mapping
-- Insert mappings for knowledge_hub_item_spec_item_pr_numbers_mapping
-- Insert mappings for knowledge_hub_item_synonyms_mapping
-- Insert mappings for knowledge_hub_item_models_mapping
