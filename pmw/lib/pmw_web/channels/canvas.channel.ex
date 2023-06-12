defmodule PmwWeb.CanvasChannel do
  @moduledoc """
  Websocket channel for the canvas.
  It allows clients to join the canvas and draw lines of points on it.
  """
  use PmwWeb, :channel
  require Logger

  @doc """
  Join the canvas channel and get the current state of the canvas.
  """
  @impl true
  def join("canvas:points", _payload, socket) do
    state = Canvas.getAll()
    {:ok, state, socket}
  end

  @doc """
  Handle the first point of a line or the addition of a point to an existing line.
  It broadcasts the point to all the clients and adds it to the canvas state.
  """
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
