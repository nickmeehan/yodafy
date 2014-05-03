get '/' do
  if logged_in?
  	redirect '/loggedin'
  else
	  erb :index
	end
end


get '/wrongo' do
	"unable to save"
end

get '/loggedin' do
	"yup, we're logged in"
end
