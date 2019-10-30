
Feature: Is the entry a valid name and lastname? 
  I want to make sure the name and the lastnme are valid. 

  Scenario Outline: Email valid(true) or invalid(false)
    Given I enter my "<name>" and "<lastname>" 
    When I click submit again 
    Then We should get "<answer>"

  Examples:
    | name           | lastname         | answer  |
    | Roberto        | Rodriguez        | true    |
    | Jose Andres    | Martin 444       | false   |
    | M4ria          | Coloma           | false   |
    | Coraz5s Mateo  | Ruiz             | false   |