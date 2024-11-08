export async function fetchDashboardData() {
    const res = await fetch('https://api.socialverseapp.com/admin/dashboard')
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard data')
    }
    return res.json()
  }