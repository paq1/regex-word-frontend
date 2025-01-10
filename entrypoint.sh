#!/bin/sh

# Chemin du fichier env-config.js
ENV_CONFIG_FILE="/usr/share/nginx/html/assets/env-config.js"

# Remplacement des placeholders par les valeurs des variables d'environnement
cat <<EOF > /usr/share/nginx/html/assets/environment.js
(function (window) {
  window.__env = window.__env || {};
  window.__env.VAR_TEST = "${VAR_TEST}";
})(this);

