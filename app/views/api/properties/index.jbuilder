json.total_pages @properties.total_pages
json.next_page @properties.next_page

json.properties do
  json.array! @properties do |property|
    json.id property.id
    json.title property.title
    json.description property.description
    json.city property.city
    json.country property.country
    json.property_type property.property_type
    json.price_per_night property.price_per_night
    json.max_guests property.max_guests
    json.bedrooms property.bedrooms
    json.beds property.beds
    json.baths property.baths
    json.user_id property.user_id

    json.images do
      json.array! property.images do |image|
        json.url url_for(image)
      end
    end
  end
end