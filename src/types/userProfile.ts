import { Institution } from './institution'
import { Profile } from './profile'

export interface UserProfile {
  id: number
  profile_id: number
  profile: Profile
  user_id: number
  institution_id: number | null
  is_health_leader: boolean | null
  institution: Institution
  registration: string | null
  is_coverage: boolean | null
}
