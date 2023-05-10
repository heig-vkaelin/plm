defmodule PmwWeb.CanvasChannel do
  use PmwWeb, :channel

  @impl true
  def join("canvas:lines", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("new_lines", payload, socket) do
    broadcast_from(socket, "recv_lines", %{lines: payload})
    {:reply, {:ok, %{}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (canvas:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end
end
