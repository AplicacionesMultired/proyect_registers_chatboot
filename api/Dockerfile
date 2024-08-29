FROM ubuntu:22.04

# Create app directory
WORKDIR /app

COPY . .

# Update repositories, install dependencies, and clean up
RUN apt-get update && \
    apt-get install -y libaio1 unzip xz-utils curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up Oracle Instant Client
RUN mkdir -p /opt/oracle && \
    mv instantclient-basic-linux.x64-11.2.0.4.0.zip /opt/oracle && \
    cd /opt/oracle && \
    unzip instantclient-basic-linux.x64-11.2.0.4.0.zip && \
    cd /opt/oracle/instantclient_11_2 && \
    ln -s libclntsh.so.11.1 libclntsh.so && \
    ln -s libocci.so.11.1 libocci.so && \
    echo /opt/oracle/instantclient_11_2 > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig && \
    mkdir -p /opt/oracle/instantclient_11_2/network/admin && \
    mv /app/tnsnames.ora /opt/oracle/instantclient_11_2/network/admin && \
    rm /opt/oracle/instantclient-basic-linux.x64-11.2.0.4.0.zip

# Download and set up Node.js
RUN mv node-v20.17.0-linux-x64.tar.xz /opt && \
    cd /opt && \
    tar -xf node-v20.17.0-linux-x64.tar.xz && \
    rm /opt/node-v20.17.0-linux-x64.tar.xz

# Add Node.js and Oracle Instant Client to the PATH
ENV PATH="/opt/node-v20.17.0-linux-x64/bin:$PATH"
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient_11_2:$LD_LIBRARY_PATH"

# Install Yarn globally and build the project
RUN npm install -g yarn && \
    yarn && \
    yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]