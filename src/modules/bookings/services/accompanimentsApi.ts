const API_BASE_URL = 'http://localhost:8080/api/v1';

interface AccompanimentSearchParams {
  destination: string;
  departureTime: string;
}

interface AccompanimentSearchResult {
  id: string;
  passengerName: string;
  transportMethod: string;
  rating: string;
  route: string;
  departureTime: string;
}

interface AccompanimentDetail {
  id: string;
  passenger: {
    name: string;
    rating: string;
    verificationStatus: string;
    avatar: string | null;
  };
  route: {
    transportMethod: string;
    meetingPoint: string;
    destination: string;
    departureTime: string;
    estimatedArrival: string;
  };
}

export async function searchAccompaniments(
  params: AccompanimentSearchParams
): Promise<AccompanimentSearchResult[]> {
  const queryParams = new URLSearchParams({
    destination: params.destination,
    departureTime: params.departureTime,
  });

  const url = `${API_BASE_URL}/accompaniments/search?${queryParams}`;
  console.log('Searching accompaniments:', url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al buscar acompañamientos: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Accompaniments search response:', data);
  return data;
}

export async function getAccompanimentDetails(
  accompanimentId: string
): Promise<AccompanimentDetail> {
  const url = `${API_BASE_URL}/accompaniments/${accompanimentId}`;
  console.log('Fetching accompaniment details:', url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al obtener detalles del acompañamiento: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Accompaniment details response:', data);
  return data;
}

export async function createAccompanimentRequest(accompanimentId: string): Promise<any> {
  const url = `${API_BASE_URL}/accompaniment-requests`;
  console.log('Creating accompaniment request:', url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accompanimentId,
      requesterId: 123, // TODO: Obtener del usuario logueado
      status: 'PENDING',
    }),
  });

  if (!response.ok) {
    throw new Error(`Error al crear solicitud de acompañamiento: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Accompaniment request created:', data);
  return data;
}

export async function getAccompanimentRequestById(requestId: string): Promise<any> {
  const url = `${API_BASE_URL}/accompaniment-requests/${requestId}`;
  console.log('Fetching accompaniment request:', url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al obtener solicitud de acompañamiento: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Accompaniment request response:', data);
  return data;
}

export async function cancelAccompanimentRequest(requestId: string): Promise<any> {
  const url = `${API_BASE_URL}/accompaniment-requests/${requestId}/cancel`;
  console.log('Cancelling accompaniment request:', url);

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error al cancelar solicitud de acompañamiento: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Accompaniment request cancelled:', data);
  return data;
}
