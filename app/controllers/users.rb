# ---------- SESSIONS ----------
get '/sessions/new' do
	erb :_signin, layout: false
end

post '/sessions' do
	
end







# ---------- NEW USER ----------

get '/users/new' do
	erb :_signup, layout: false
end
