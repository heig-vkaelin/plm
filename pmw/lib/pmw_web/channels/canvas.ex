defmodule Canvas do
  use Agent

  def start_link(_) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def add_initial(line_id, x, y, color) do
    Agent.update(__MODULE__, fn state ->
      state
      |> Map.put(line_id, [x, y])
      |> Map.put("#{line_id}-color", color)
    end)
  end

  def add(line_id, x, y) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, line_id, [x, y | Map.get(state, line_id)])
    end)
  end

  def reset do
    Agent.update(__MODULE__, fn _state -> %{} end)
  end

  def get(line_id) do
    Agent.get(__MODULE__, fn state ->
      Map.get(state, line_id)
    end)
  end

  def getKeys() do
    Agent.get(__MODULE__, fn state ->
      Map.keys(state)
    end)
  end

  def getAll() do
    Agent.get(__MODULE__, fn state ->
      state
    end)
  end
end
