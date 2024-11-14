module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    # Gets a single booking for a user
    def show
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @booking = Booking.includes(:property, :charges)
                       .find_by(id: params[:id], user_id: session.user.id)
      
      if @booking
        render 'api/bookings/show'
      else
        render json: { error: 'booking not found' }, status: :not_found
      end
    end

     # Gets all bookings for a user
     def get_user_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session
    
      @bookings = Booking.includes(:property)
                        .where(user_id: session.user.id)
                        .where("end_date > ?", Date.today)
      render 'api/bookings/index'
    end

    # Gets all bookings for a property
    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/index'
    end

   

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end

