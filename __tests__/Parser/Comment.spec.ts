import {
    Helpers,
    ParserTree,
    ScalarTypes,
    TypeDefinition,
    TypeDefinitionDisplayStrings,
    TypeSystemDefinition
} from '../../src/Models';
import { Parser, ParserUtils } from '../../src/Parser';

describe('Comment tests on parser', () => {
    it('Creates comment node from graphql', () => {
        const schema = `
          type Person{
              name:String
          }
          # hello world
          `;
        const tree = Parser.parse(schema);
        const treeMock: ParserTree = {
            nodes: [{
                name: 'Person',
                type: {
                    name: TypeDefinitionDisplayStrings.type
                },
                data: {
                    type: TypeDefinition.ObjectTypeDefinition
                },
                description: '',
                interfaces: [],
                directives: [],
                args: [
                    {
                        name: 'name',
                        args: [],
                        type: {
                            name: ScalarTypes.String
                        },
                        directives: [],
                        data: {
                            type: TypeSystemDefinition.FieldDefinition
                        }
                    }
                ]
            },
            {
                name: 'comment',
                type: {
                    name: 'comment'
                },
                data: {
                    type: Helpers.Comment
                },
                description: 'hello world',
            },
            ]
        };
        expect(ParserUtils.compareParserTreesNodes(tree.nodes, treeMock.nodes)).toBe(true);
    });
});
