import socket
import os
import threading
import sys
import datetime

HOST = 'localhost'
PORT = 3337

def start_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('0.0.0.0',4324))
    server_socket.listen(1)
    # server_socket.settimeout(10)
    print("Server started, waiting for connection")
    cli_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    cli_sock.connect((HOST, PORT))
    while True:
        conn, addr = server_socket.accept()
        print("Client connected:",addr)
        data = conn.recv(1024)
        if not data:
            break
        
        print(f"Received data({datetime.datetime.now()}): {data.decode('ascii')}")
        conn.send("Message received".encode('ascii'))
        cli_sock.send(data)
    cli_sock.close()
    print("Client disconnected")
    conn.close()

start_server()