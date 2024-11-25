module Api
  class PropertiesController < ApplicationController

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      Rails.logger.info "Received params: #{params.inspect}"

      @property = Property.new(property_params) 
      @property.user = session.user

      if @property.save
        render 'api/properties/create', status: :created
      else
        Rails.logger.error "Property save failed: #{@property.errors.full_messages}"
        render json: { success: false, errors: @property.errors.full_messages }, status: :bad_request
      end
    end       

    def update
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @property = Property.find_by(id: params[:id])
      return render json: { error: 'property not found' }, status: :not_found if !@property
      
      return render json: { error: 'unauthorized' }, status: :unauthorized if @property.user != session.user

      if @property.update(property_params)
        render json: { property: @property }, status: :ok
      else
        render json: { error: @property.errors.full_messages }, status: :bad_request
      end
    end

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(12)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end
 
    private

    def property_params
      permitted_params = params.require(:property).permit(
        :title,
        :description,
        :city,
        :country,
        :property_type,
        :price_per_night,
        :max_guests,
        :bedrooms,
        :beds,
        :baths,
        :user_id,
        images: []
      )
      Rails.logger.info "Permitted params: #{permitted_params.inspect}"
      permitted_params
    end
  end
end