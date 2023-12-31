"""empty message

Revision ID: 4954e9890772
Revises: be3c2be7e29e
Create Date: 2023-10-11 22:16:58.668955

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4954e9890772'
down_revision = 'be3c2be7e29e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('create_time', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('history', schema=None) as batch_op:
        batch_op.drop_column('create_time')

    # ### end Alembic commands ###
