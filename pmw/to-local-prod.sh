# Secret
secret=`mix phx.gen.secret`

# Initial setup
mix deps.get --only prod
MIX_ENV=prod mix compile

# Compile assets
MIX_ENV=prod mix assets.deploy

# Finally run the server
SECRET_KEY_BASE=$secret PORT=4001 MIX_ENV=prod mix phx.server