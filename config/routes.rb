Rails.application.routes.draw do
  root 'layout#index'

  get '/*frontend_path' => 'layout#index', constraints: { frontend_path: %r{(test-classes-overload|test-styles-overload)} }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
