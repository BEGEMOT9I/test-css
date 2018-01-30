class LayoutController < ApplicationController
  layout 'client'

  def index
    render 'layouts/client'
  end
end