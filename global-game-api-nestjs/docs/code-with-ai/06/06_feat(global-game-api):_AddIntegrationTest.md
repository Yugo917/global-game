# 06_feat(global-game-api):_AddIntegrationTest

open prompt with NodeTs_Tester and Add source src.zip

- prompt1 :
```
Analyze the TypeScript files attached and retain the relevant code in your memory for future reference. Once the analysis is complete, please confirm by responding with 'Done'."
```

- prompt2 :
```
Can you create the integration test for PlayersController without mocking
```


- prompt3:
```
Can you update the test to have all those test cases:

findAll_WithExistingPlayers_ShouldSucceed
findAll_WithNoPlayers_ShouldReturnEmptyArray
findOne_WithValidId_ShouldReturnPlayer
findOne_WithInvalidId_ShouldThrowNotFoundException
create_WithValidData_ShouldReturnCreatedPlayer
create_WithMissingData_ShouldThrowError
create_WithNotConformData_ShouldThrowError
update_WithValidData_ShouldReturnUpdatedPlayer
update_WithNonExistingPlayer_ShouldThrowError
update_WithMissingData_ShouldThrowError
update_WithNotConformData_ShouldThrowError
delete_WithValidId_ShouldSucceed
delete_WithInvalidId_ShouldThrowError
deactivate_WithValidId_ShouldReturnDeactivatedPlayer
deactivate_WithAlreadyInactivePlayer_ShouldThrowError
deactivate_WithInvalidId_ShouldThrowError
```