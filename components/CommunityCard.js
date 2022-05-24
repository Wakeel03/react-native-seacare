import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MinimalCard from './MinimalCard'

const CommunityCard = ({ isMember, community, backgroundColor }) => {
  const navigation = useNavigation()

  return (
    <MinimalCard onPress={() => navigation.navigate('Community', { isMember, community })} mainText={community.name} subText={`${community.members.length} Members`} backgroundColor={backgroundColor} />
  )
}

export default CommunityCard