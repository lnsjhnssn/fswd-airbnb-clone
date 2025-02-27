class StaticPagesController < ApplicationController
  def home
  end
  
  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

    def login
      render 'login'
    end

    def my_trips
      render 'my_trips'
    end

  def success
    @data = { booking_id: params[:id] }.to_json
    render 'success'
  end

 
end
