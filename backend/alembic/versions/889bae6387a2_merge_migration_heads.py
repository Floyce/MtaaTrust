"""merge_migration_heads

Revision ID: 889bae6387a2
Revises: 929987ded37f
Create Date: 2026-01-04 17:57:30.754128

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '889bae6387a2'
down_revision: Union[str, None] = '929987ded37f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
