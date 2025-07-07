
-- Insert data into knowledge_hub_items (Finance Items)
INSERT INTO knowledge_hub_items (name, short_description, primary_image, content, category, popularity, featured)
SELECT 'Approved Used', 'Volkswagen Approved Used Plus Programme', 'https://showroom-assets.volkswagen.co.uk/images/usedcars/usedCarsExchange.jpg', '---
assets:
  - id: '0'
    title: 2 years’ servicing included for vehicles up to 5 years old††
    text: ''
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCarsApprovedBenefits.jpg
    videoURL: ''
    buttonTitle: 2 years’ servicing included for vehicles up to 5 years old††
  - id: '1'
    title: '*2 years’ unlimited mileage Warranty‡'
    text: ''
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCars2YearsMileageWarranty.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_2_years_unlimited_mileage.mp4
    buttonTitle: '*2 years’ unlimited mileage Warranty‡'
  - id: '3'
    title: '*2 years’ Roadside Assistance‡'
    text: ''
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCars12MonthRoadsideAssistance.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_2_years_roadside_assistance.mp4
    buttonTitle: '*2 years’ Roadside Assistance‡'
  - id: '4'
    title: Multipoint check
    text: >-
      Our skilled, Volkswagen trained technicians carry out a thorough workshop
      and test drive inspection of every car before it can become an Approved
      Used Volkswagen.
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCars142PointCheck.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_multipoint_check.mp4
    buttonTitle: Multipoint check
  - id: '5'
    title: Service history checks
    text: >-
      This certificate details your car’s entire Approved Used Retailer Network
      history and verifies the status of the Warranty.
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCarsServiceHistoryCheck.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_service_history_checks.mp4
    buttonTitle: Service history checks
  - id: '6'
    title: Independent vehicle history and mileage checks
    text: We check the vehicle identity and match it with the DVLA registration.
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCarsHistoryAndMileageCheck.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_independance_vehicle_history_mileage_checks.mp4
    buttonTitle: Independent vehicle history and mileage checks
  - id: '7'
    title: No quibble exchange‡‡
    text: >-
      30 day/1000 miles ‘No Quibble’ Exchange Policy, if for any reason, you
      want to change the car.
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCarsNoQuibbleExchange.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_no_quibble_exchange.mp4
    buttonTitle: No quibble exchange‡‡
  - id: '8'
    title: Complimentary 5 days’ Volkswagen Drive Away Insurance^
    text: >-
      Every used Volkswagen, purchased from a Volkswagen Retailer, comes with
      five days' complimentary insurance (subject to eligibility).
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCars5DayFreeInsurance.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_complimentary_5day_insurance.mp4
    buttonTitle: Complimentary 5 days’ Volkswagen Drive Away Insurance^
  - id: '9'
    title: Experts in electric
    text: >-
      All electric vehicles in the Approved Used Volkswagen Programme receive a
      comprehensive multi point check where our highly trained technicians test
      the battery so you’ll know the current health and capacity. At handover,
      you will receive a battery health certificate for extra peace of mind.
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCarsExpertsInElectric.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedcars_approved_used_benefits_experts_in_electric.mp4
    buttonTitle: Experts in electric
  - id: '10'
    title: Battery health and degradation in Approved Used BEVs
    text: >-
      As Experts in electric we want to share as much information as we can with
      our customers about their future BEV, this includes battery state of
      health. This video helps to explain battery degradation to your customers.
    posterImageURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars/usedCarsBatteryHealthCheck.jpg
    videoURL: >-
      https://showroom-assets.volkswagen.co.uk/images/usedCars//videos/usedcars/usedCars_battery_health_with_subtitles-nov_2023.mp4
    buttonTitle: Battery health and degradation in Approved Used BEVs
---

When you buy from a participating Volkswagen Retailer, and you purchase with a Solutions Personal Contract Plan, you will receive: - 2 years'' unlimited mileage warranty^ - 2 years'' Roadside Assistance^ - Flexible finance options - Multipoint Check - Service history checks - Independent vehicle history and mileage checks - 30 day/1000 miles ‘no quibble’ exchange policy - 5 days’ complimentary Volkswagen Drive Away Insurance† - Experts in electric - 13.4% APR Representative†',
  (SELECT id FROM knowledge_hub_categories WHERE LOWER(name) = LOWER('Used Cars') LIMIT 1), 0, false
WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('Approved Used'));

