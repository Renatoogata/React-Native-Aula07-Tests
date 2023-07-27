import { renderHook, waitFor, act } from "@testing-library/react-native"
import { CityProvider } from "./CityContext"

import { useCity } from "@hooks/useCity"

describe("Context: CityContext", () => {
  it("should be change selected city", async () => {
    const { result } = renderHook(() => useCity(), { wrapper: CityProvider })

    await waitFor(() =>
      act(() => {
        result.current.handleChanceCity({
          id: "1",
          name: "São Paulo",
          latitude: 123,
          longitude: 456
        })
      })
    )

    expect(result.current.city?.name).toBe("São Paulo")
  })
})