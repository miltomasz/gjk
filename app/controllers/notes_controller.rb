class NotesController < ApplicationController
  def create
  	@note = Note.new(params[:note])

    if @note.save
      redirect_to root_path
    end
  end

  def index
    @notes = Note.all

    render json: @notes
  end
end
