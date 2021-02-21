import { MutationResult, gql, useMutation } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  Configuration,
  UpdateConfigurationMutation,
  UpdateConfigurationMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { ConfigurationFragment } from '../../fragments'

export const UpdateConfigurationDocument = gql`
  ${ConfigurationFragment}
  mutation UpdateConfiguration($input: UpdateConfigurationInput!) {
    updateConfiguration(input: $input) {
      ...configuration
    }
  }
`

export function useUpdateConfiguration(): [
  (
    configuration: Configuration
  ) => Promise<ExecutionResult<UpdateConfigurationMutation>>,
  MutationResult<UpdateConfigurationMutation>
] {
  const [mutation, mutationResult] = useMutation<
    UpdateConfigurationMutation,
    UpdateConfigurationMutationVariables
  >(UpdateConfigurationDocument, {
    errorPolicy: 'all',
  })

  async function updateConfiguration(configuration: Configuration) {
    return mutation({
      variables: {
        input: {
          connectedRepos: configuration.connectedRepos,
        },
      },
    })
  }

  return [updateConfiguration, mutationResult]
}
