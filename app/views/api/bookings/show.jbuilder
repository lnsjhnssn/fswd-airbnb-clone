json.booking do
  json.id @booking.id
  json.start_date @booking.start_date
  json.end_date @booking.end_date
  
  json.property do
    json.id @booking.property.id
    json.title @booking.property.title
  end
  
  json.charges @booking.charges do |charge|
    json.id charge.id
    json.amount charge.amount
    json.complete charge.complete
    json.currency charge.currency
    json.checkout_session_id charge.checkout_session_id
  end
end