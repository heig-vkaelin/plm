defmodule PmwWeb.PageController do
  use PmwWeb, :controller

  # The colors that can be used to draw on the canvas.
  @colors [
    '#FFFFFF',
    '#E4E4E4',
    '#888888',
    '#A61FEB',
    '#FFA7D1',
    '#E50000',
    '#E59500',
    '#A06A42',
    '#E5D900',
    '#94E044',
    '#05BE03',
    '#00D3DD',
    '#0083C7',
    '#0000EA',
    '#CF6EE4',
    '#820080'
  ]

  def home(conn, _params) do
    render(conn, :home, layout: false, colors: @colors)
  end
end
