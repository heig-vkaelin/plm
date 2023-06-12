defmodule Canvas do
  @moduledoc """
  This module is used to store the state of the canvas.
  """
  use Agent

  @doc """
  Starts the canvas agent.
  """
  def start_link(_) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  @doc """
  Adds a new line to the canvas state.
  """
  def add_initial(line_id, x, y, color) do
    Agent.update(__MODULE__, fn state ->
      state
      |> Map.put(line_id, [x, y])
      |> Map.put("#{line_id}-color", color)
    end)
  end

  @doc """
  Adds a new point to an existing line in the canvas state.
  """
  def add(line_id, x, y) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, line_id, [x, y | Map.get(state, line_id)])
    end)
  end

  @doc """
  Resets the canvas state.
  """
  def reset do
    Agent.update(__MODULE__, fn _state -> %{} end)
  end

  @doc """
  Gets a line from the canvas state by its id.
  """
  def get(line_id) do
    Agent.get(__MODULE__, fn state ->
      Map.get(state, line_id)
    end)
  end

  @doc """
  Gets all the lines from the canvas state.
  """
  def getAll() do
    Agent.get(__MODULE__, fn state ->
      state
    end)
  end
end
