docker run -p 7005:4000 \
  --env HIVE_CDN_ENDPOINT="..." \
  --env HIVE_CDN_KEY="..." \
  --rm \
  ghcr.io/kamilkisiela/graphql-hive/apollo-router:latest
