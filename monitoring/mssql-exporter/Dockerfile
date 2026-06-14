FROM ghcr.io/burningalchemist/sql_exporter:0.15

COPY sql_exporter.yml /etc/sql_exporter/sql_exporter.yml
COPY collectors/ /etc/sql_exporter/collectors/

EXPOSE 9399
ENTRYPOINT ["/bin/sql_exporter", "--config.file=/etc/sql_exporter/sql_exporter.yml"]