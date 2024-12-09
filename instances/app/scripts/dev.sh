pnpm nodemon \
  --delay 4 \
  --ext js,info,tid \
  --ignore mywiki/tiddlers \
  --exec ./node_modules/tiddlywiki/tiddlywiki.js \
    -- mywiki --listen host=localhost port=4801 \
  &
P1=$!
pnpm browser-sync start \
  --files node_modules/@rougsig/**/* \
  --proxy http://localhost:4801 \
  --port 4800 \
  &
P2=$!
wait $P1 $P2
