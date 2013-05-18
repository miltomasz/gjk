class NotesController < ApplicationController
  def create
  	@note = Note.new(params[:note])
  	
    if @note.save
      redirect_to root_path
    else
    	head :no_content
    end
  end
end
