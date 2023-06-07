defmodule PmwWeb.CanvasChannel do
  use PmwWeb, :channel
  require Logger

  @impl true
  def join("canvas:points", _payload, socket) do
    state = Canvas.getAll()
    {:ok, state, socket}
  end

  @impl true
  def handle_in("first_point", payload, socket) do
    broadcast_from(socket, "first_point", payload)
    Canvas.add_initial(payload["id"], payload["x"], payload["y"], payload["color"])

    {:reply, {:ok, %{}}, socket}
  end

  @impl true
  def handle_in("new_point", payload, socket) do
    broadcast_from(socket, "new_point", payload)
    Canvas.add(payload["id"], payload["x"], payload["y"])

    {:reply, {:ok, %{}}, socket}
  end
end
