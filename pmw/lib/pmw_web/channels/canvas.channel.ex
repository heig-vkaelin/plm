defmodule PmwWeb.CanvasChannel do
  use PmwWeb, :channel
  require Logger

  @impl true
  def join("canvas:points", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("first_point", payload, socket) do
    broadcast_from(socket, "first_point", payload)
    {:reply, {:ok, %{}}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("new_point", payload, socket) do
    broadcast_from(socket, "new_point", payload)

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
