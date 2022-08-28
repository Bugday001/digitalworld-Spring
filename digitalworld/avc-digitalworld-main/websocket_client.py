from time import sleep
from websocket import create_connection

def client_handle():
    ws = create_connection('ws://127.0.0.1:5678')
    while True:
        if ws.connected:
            ws.send('admin:123456')
            result = ws.recv()
            print(f"client received:{result}")
            sleep(1)
            # ws.close()

if __name__ == "__main__":
    client_handle()