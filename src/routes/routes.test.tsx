import { saveStorageCity } from "@libs/asyncStorage/cityStorage"
import { api } from "@services/api"
import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse"
import { render, waitFor, screen, act } from "@__tests__/utils/customRender"

import { Routes } from "./index"

describe("Routes", () => {
  it("should be render Search screen when not city selected", async () => {
    render(<Routes />)

    const title = await waitFor(() => screen.findByText(/^escolha um local/i))

    expect(title).toBeTruthy()
  })

  it("should be render Dashboard screen when city is selected", async () => {
    jest.spyOn(api, "get").mockResolvedValue({ data: mockWeatherAPIResponse })

    const city = {
      id: "1",
      name: "São Paulo",
      latitude: 123,
      longitude: 456
    }

    await saveStorageCity(city)

    await act(() => waitFor(() => render(<Routes />)))

    const title = screen.getByText(city.name)
    expect(title).toBeTruthy()
  })
})
