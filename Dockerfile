# Dockerfile for static hosting of ai-hand-detection
FROM nginx:alpine

# Copy application files to Nginx web root
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY video.js /usr/share/nginx/html/
COPY telemetry.js /usr/share/nginx/html/
COPY telemetry-sample.json /usr/share/nginx/html/
COPY mouse /usr/share/nginx/html/mouse

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
