class EventsController < ApplicationController
  # GET /events
  # GET /events.json
  def index
    lat = params[:lat]
    lng = params[:lng]

    puts "Params >> : #{params}"

    @events = Event.where("created_at >= :date", :date => 15.minutes.ago).within(3, :origin => [lat, lng])

    render json: @events
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find(params[:id])

    render json: @event
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(params[:event])

    if @event.save
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    if @event.update_attributes(params[:event])
      head :no_content
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    head :no_content
  end
end
