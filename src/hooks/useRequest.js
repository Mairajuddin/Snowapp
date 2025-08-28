

// export const baseURL = "http://192.168.18.33:5000";
// export const imageURL = "http://192.168.18.33:5000/";

export const baseURL = "http://64.23.166.88:7218";
export const imageURL = "http://64.23.166.88:7218/";


export const FireApi = async (endpoint, method, data = null, Headers = null) => {
  const defaultHeaders = { 
    "Content-Type": "application/json",
   "ngrok-skip-browser-warning":"true"
  };
  const headers = Headers ? { ...defaultHeaders, ...Headers } : defaultHeaders;

  try {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    const json = await response.json();

    return {
      ...json,
      status: response.status,  // keep status for debugging
      ok: response.ok,          // include ok if you want
    };
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      message: "Network error",
      error: error.message,
    };
  }
};
