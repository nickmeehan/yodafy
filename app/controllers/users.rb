# ---------- SESSIONS ----------
get '/sessions/new' do
	erb :_signin, layout: false
end

post '/sessions' do
	@user = User.find_by_email(params[:email])
	if @user && @user.password == params[:password]
		session[:user_id] = @user.id
		redirect '/'
	else
		redirect '/'
	end
end

delete '/sessions' do
	session.clear
	redirect '/'
end

get '/demo' do
	@user = User.find_by_email('demo@demo.com')
	session[:user_id] = @user.id
	redirect '/'
end





# ---------- NEW USER ----------

get '/users/new' do
	erb :_signup, layout: false
end


post '/users' do
	@user = User.new(params)
	if @user.save
		session[:user_id] = @user.id
		redirect '/'
	else
		redirect '/'
	end
end